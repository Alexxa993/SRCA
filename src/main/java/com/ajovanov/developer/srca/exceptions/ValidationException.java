package com.ajovanov.developer.srca.exceptions;

/**
 * Validation exception.
 */
class ValidationException extends Exception
{
    /**
     * Parameterless Constructor
     */
    public ValidationException() {}

    /**
     * Constructor that accepts a message.
     * @param message
     */
    public ValidationException(String message)
    {
        super(message);
    }
}
