describe('Login page', () => {

  beforeEach(function () {
    cy.visit('/')
    cy.fixture("/login/login.json").as('loginData')
    cy.fixture("/login/error_messages.json").as('loginErrorMsg')
  })

  it('Visits login and checking label values', () => {

    cy.get('h1').should('contain.text', 'PokeGhost APP')
    cy.get('p').should('contain.text', 'Tu mundo de pokemon fantasma')
    cy.get('@loginData').then(function ($loginData) {
      cy.get($loginData.label_email).should('contain.text', 'Correo electrónico')
      cy.get($loginData.label_password).should('contain.text', 'Password')
    })
  })

  it('Testing formato de correo o clave inválidos', function () {
    //Formato de correo inválido
    cy.get('@loginData').then(function ($loginData) {
      cy.get('@loginErrorMsg').then(function ($error_msg) {
        cy.get($loginData.input_email).type('{selectall}{backspace}est')
        cy.get($loginData.input_password).type('{selectall}{backspace}test1234')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_formato_correo_invalido)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
    //Formato de password inválido
        cy.get($loginData.input_email).type('{selectall}{backspace}test@test.cl')
        cy.get($loginData.input_password).type('{selectall}{backspace}test')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_formato_password_invalido)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
        cy.get($loginData.div_alert).should('not.be.visible')
      })
    })
  })

  it('Testing correo o clave inválidos', function () {
    //Correo inválido
    cy.get('@loginData').then(function ($loginData) {
      cy.get('@loginErrorMsg').then(function ($error_msg) {
        cy.get($loginData.input_email).type('{selectall}{backspace}tdst500@test.cl')
        cy.get($loginData.input_password).type('{selectall}{backspace}test1234')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_correo_o_password_invalidos)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
        //Clave inválida
        cy.get($loginData.input_email).type('{selectall}{backspace}test3@test.cl')
        cy.get($loginData.input_password).type('{selectall}{backspace}ttestt')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_correo_o_password_invalidos)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
        cy.get($loginData.div_alert).should('not.be.visible')
      })
    })
  })
  it('Testing correo o clave vacíos', function () {
    //Correo vacío
    cy.get('@loginData').then(function ($loginData) {
      cy.get('@loginErrorMsg').then(function ($error_msg) {
        cy.get($loginData.input_email).type('{selectall}{backspace} ')
        cy.get($loginData.input_password).type('{selectall}{backspace}test1234')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_formato_correo_invalido)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
        //Clave vacía
        cy.get($loginData.input_email).type('{selectall}{backspace}test1@test.cl')
        cy.get($loginData.input_password).type('{selectall}{backspace} ')
        cy.get($loginData.btn_ingresar).click()
        //Error login alert, encabezado
        cy.get($loginData.div_alert + ' h2').should('be.visible').and('contain', $error_msg.alert_header)
        //Error login alert, body
        cy.get($loginData.div_alert + ' div').should('be.visible').and('contain', $error_msg.alert_body_formato_password_invalido)
        //Aceptar
        cy.get($loginData.div_alert + ' span').click()
        cy.get($loginData.div_alert).should('not.be.visible')
      })
    })
  })

  it('Testing login correcto y ver info de pokemon fantasma', function () {
    cy.get('@loginData').then(function ($loginData) {
      cy.get('@loginErrorMsg').then(function ($error_msg) {
        cy.get($loginData.input_email).type('{selectall}{backspace}test3@test.cl')
        cy.get($loginData.input_password).type('{selectall}{backspace}clav33')
        cy.get($loginData.btn_ingresar).click()
        cy.get('h1').should('be.visible').and('contain.text','Bienvenido!')
        cy.get('ion-button').contains('Ver info de pokemon fantasma').click();
        cy.get('h1').should('be.visible').and('contain.text','Los pokemon fantasma');
      })
    })
  })
})
