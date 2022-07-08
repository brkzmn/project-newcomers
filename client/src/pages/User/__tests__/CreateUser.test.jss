import React from "react";
import {
  render,
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import CreateUser from "../CreateUser";
import TEST_ID_CREATE_USER from "../CreateUser.testid";
import {
  createUserSuccessMock,
  createUserFailedMock,
} from "../../../__testUtils__/fetchUserMocks";

beforeEach(() => {
  fetch.resetMocks();
});

describe("CreateUser", () => {
  it("Renders without a problem", () => {
    render(<CreateUser />);

    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.container)
    ).toBeInTheDocument();
  });

  it("Should be able to change name and email input", () => {
    const testFirstName = "John";
    const testLastName = "doe";
    const testEmail = "john@doe.com";
    const testUserName = "johndudu";
    const testPassword = "123456";
    const testBirthDay = "10-10-1991";

    render(<CreateUser />);

    // Check initially fields are empty
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput).value
    ).toEqual("");
    expect(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.emailInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      ""
    );

    // Change fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput), {
      target: { value: testFirstName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput), {
      target: { value: testLastName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.emailInput), {
      target: { value: testEmail },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput), {
      target: { value: testBirthDay },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });

    // Check fields have changed value
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput).value
    ).toEqual(testFirstName);
    expect(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput).value).toEqual(
      testLastName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      testUserName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.emailInput).value).toEqual(
      testEmail
    );
    /* expect(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput).value).toEqual(
      testBirthDay
    ); */
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
  });

  it("Should send the input values to the server on clicking submit and indicate loading states", async () => {
    const testFirstName = "John";
    const testLastName = "doe";
    const testEmail = "john@doe.com";
    const testUserName = "johndudu";
    const testPassword = "123456";
    const testBirthDay = "10-10-1991";

    // Mock our fetch
    fetch.mockResponseOnce(createUserSuccessMock());

    render(<CreateUser />);

    // Fill in our fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput), {
      target: { value: testFirstName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput), {
      target: { value: testLastName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.emailInput), {
      target: { value: testEmail },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput), {
      target: { value: testBirthDay },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });

    // Make sure fetch hasn't been called yet
    expect(fetch.mock.calls.length).toEqual(0);

    // Check that there is no loading indicator initially
    expect(
      await screen.queryByTestId(TEST_ID_CREATE_USER.loadingContainer)
    ).not.toBeInTheDocument();

    // Click submit
    fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton));

    // Wait for the loading to be shown
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.loadingContainer)
    ).toBeInTheDocument();

    // Wait for the loading state to be removed
    await waitForElementToBeRemoved(
      screen.getByTestId(TEST_ID_CREATE_USER.loadingContainer)
    );

    // Check that the right endpoint was called
    expect(fetch.mock.calls.length).toEqual(1);
    // Check the right data is given. We need the second argument ([1]) of the first call ([0])
    /*   expect(fetch.mock.calls[0][1].body).toEqual(
      // We need to stringify as we send the information as a string
      JSON.stringify({
        user: { firstName: testFirstName, lastName: testLastName, userName: testUserName, password: testPassword, email: testEmail, birthDay: testBirthDay },
      })
    ); */

    // Check to see that the fields were cleared after a successful submit after everything has settled
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput).value
    ).toEqual("");
    expect(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.emailInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput).value).toEqual(
      ""
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      ""
    );
  });

  it("Should show an error state if the creation is unsuccessful", async () => {
    const testFirstName = "John";
    const testLastName = "doe";
    const testEmail = "john@doe.com";
    const testUserName = "johndudu";
    const testPassword = "123456";
    const testBirthDay = "10-10-1991";

    // Mock our fetch
    fetch.mockResponseOnce(createUserFailedMock());

    render(<CreateUser />);

    // Fill in our fields
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput), {
      target: { value: testFirstName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput), {
      target: { value: testLastName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput), {
      target: { value: testUserName },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.emailInput), {
      target: { value: testEmail },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput), {
      target: { value: testBirthDay },
    });
    fireEvent.change(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput), {
      target: { value: testPassword },
    });

    // Check that there is no error indicator initially
    expect(
      screen.queryByTestId(TEST_ID_CREATE_USER.errorContainer)
    ).not.toBeInTheDocument();

    // Click submit
    fireEvent.click(screen.getByTestId(TEST_ID_CREATE_USER.submitButton));

    // Wait to see the error component
    waitFor(() =>
      expect(
        screen.findByTestId(TEST_ID_CREATE_USER.errorContainer)
      ).toBeInTheDocument()
    );

    // Check to see that the fields are still filled in
    expect(
      screen.getByTestId(TEST_ID_CREATE_USER.firstNameInput).value
    ).toEqual(testFirstName);
    expect(screen.getByTestId(TEST_ID_CREATE_USER.lastNameInput).value).toEqual(
      testLastName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.userNameInput).value).toEqual(
      testUserName
    );
    expect(screen.getByTestId(TEST_ID_CREATE_USER.emailInput).value).toEqual(
      testEmail
    );
    /* expect(screen.getByTestId(TEST_ID_CREATE_USER.birthDayInput).value).toEqual(
      testBirthDay
    ); */
    expect(screen.getByTestId(TEST_ID_CREATE_USER.passwordInput).value).toEqual(
      testPassword
    );
  });
});
