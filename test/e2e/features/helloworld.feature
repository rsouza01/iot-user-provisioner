# features/bank-account.feature
Feature: Hello World

  Scenario: Shows message
    Given A bank account with starting balance of $100
    When $100 is deposited
    Then The bank account balance should be $200