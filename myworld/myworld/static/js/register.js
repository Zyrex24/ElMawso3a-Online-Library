 //We start indexing at one because CSRF_token is considered an input field 
        //Query All input fields
        let form_fields = document.getElementsByTagName('input')
        form_fields[1].placeholder='Username..';
        form_fields[2].placeholder='Email..';
        form_fields[3].placeholder='Enter password...';
        form_fields[4].placeholder='Re-enter Password...';

        for (let field in form_fields){   
            form_fields[field].className += ' form-control'
        }