let $registerFormContainer = $('#registerFormContainer');
if ($registerFormContainer.length != 0) {
    console.log('Registration form detected. Binding event handling logic to form elements.');
    //If the jQuery object which represents the form element exists,
    //the following code will create a method to submit registration details
    //to server-side api when the #submitButton element fires the click event.
    $('#submitButton').on('click', function (event) {
        event.preventDefault();
        const baseUrl = 'http://52.45.103.168:5000';
        let fullName = $('#fullNameInput').val();
        let email = $('#emailInput').val();
        let password = $('#passwordInput').val();
        let webFormData = new FormData();
        reUserName = new RegExp(/^[a-zA-Z\s,']+$/);
        rePassword = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]{8,}$/);
        reEmail = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)
        webFormData.append('fullName', fullName);
        webFormData.append('email', email);
        webFormData.append('password', password);

        if (fullName == "" || email == "" || password == "") {
            new Noty({
                type: 'error',
                timeout: '6000',
                layout: 'topCenter',
                theme: 'bootstrap-v4',
                text: 'Invalid. Please Try Again',
            }).show();
            return false

        } else if (!reUserName.test(fullName) || !reEmail.test(email) || !rePassword.test(password)) {
            new Noty({
                type: 'error',
                timeout: '6000',
                layout: 'topCenter',
                theme: 'bootstrap-v4',
                text: 'Criteria not met.',
            }).show(); // AbA12345
            
        } else {
            axios({
                method: 'post',
                url: baseUrl + '/api/user/register',
                data: webFormData,
                headers: { 'Content-Type': 'multipart/form-data' }
            })
                .then(function (response) {
                    //Handle success
                    console.dir(response);
                    new Noty({
                        type: 'success',
                        timeout: '6000',
                        layout: 'topCenter',
                        theme: 'bootstrap-v4',
                        text: 'You have registered. Please <a href="login.html" class=" class="btn btn-default btn-sm" >Login</a>',
                    }).show();
                })
                .catch(function (response) {
                    //Handle error
                    console.dir(response);
                    new Noty({
                        timeout: '6000',
                        type: 'error',
                        layout: 'topCenter',
                        theme: 'sunset',
                        text: 'Unable to register.',
                    }).show();
                });
        }
    });

} //End of checking for $registerFormContainer jQuery object