
package com.url.shorter.exception;
public class AccountNotFoundException extends RuntimeException {

	// Define serialVersionUID to avoid warning
    private static final long serialVersionUID = 1L;

    public AccountNotFoundException(String message) {
        super(message);  // Pass the error message to the superclass (RuntimeException)
    }
}
