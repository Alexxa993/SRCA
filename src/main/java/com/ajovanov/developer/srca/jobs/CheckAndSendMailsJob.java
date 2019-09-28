package com.ajovanov.developer.srca.jobs;

import com.ajovanov.developer.srca.model.SoftwareComponent;
import com.ajovanov.developer.srca.repository.SoftwareComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Scheduled job for sending mails before start and finish time of a software
 * component in a certain phase.
 */
@Component
public class CheckAndSendMailsJob {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private SoftwareComponentRepository repository;

    /** This Fires at 12 PM every day.
     * For testing purpose localy we can use something that fires every 20 seconds:
     * @Scheduled(cron = "0/20 * * * * ?")
     */
    @Scheduled(cron = "0 0 12 * * ?")
    public void checkAndSendMail() {
        List<SoftwareComponent> components = repository.findAll();

        LocalDate currentDate = LocalDate.now();
        components.stream().forEach(component -> {
            component.getPhases().stream().forEach(phase -> {
                SimpleMailMessage msg = new SimpleMailMessage();
                List<String> emails =
                        new ArrayList<String>
                                (Arrays.asList(component.getEmails().split(";")));
                msg.setTo(String.valueOf(emails));

                msg.setSubject("SRCA - Software Release Cycle Assistent");
                if (phase.getDateFrom().plusDays(1).equals(currentDate)) {
                    msg.setText("Hello Team \n Tommorow starts the release cycle " +
                            "for the component: " + component.getComponentId()
                            + "in phase: " + phase.getName() + ",\n"
                            + "Yours SRCA team");

                    javaMailSender.send(msg);
                } else if (phase.getDateTo().plusDays(3).equals(currentDate)) {
                    msg.setText("Hello Team \n In three days from now finishes the release cycle " +
                            "for the component: " + component.getComponentId()
                            + "in phase: " + phase.getName() + ",\n"
                            + "Yours SRCA team");

                    javaMailSender.send(msg);
                }
            });
        });
    }
}
