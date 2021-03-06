//https://docs.frinx.io/frinx-machine/use-cases/save-and-run-command/save-and-run-command.html
//Save and execute commands on devices
describe('Save and execute commands on devices', function() {
  beforeEach(function() {
    cy.login()
  })
	
  it('Save a command to inventory', function() {
    cy.server()
    cy.route('POST', '/api/conductor/workflow').as('getWorkflowId')

    cy.visit('/')

    cy.contains('Workflows').click()
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Add_cli_command_template_to_inventory')
    cy.contains('Add_cli_command_template_to_inventory').click()

    cy.get('button[title="Execute"]').click()

    cy.contains('template_id').next().as('template_id')
    cy.get('@template_id').type('{selectall}{backspace}')
    cy.get('@template_id').type('sh_run')

    //cy.get('div.form-group > textarea').as('command')
    //20200415 ^^^ this stopped to work
    //cy.contains('command template e.g. show running-config').prev().as('command')
    //20200813 ^^^ this stopped to work
    cy.contains(/^command$/).next().as('command')
    cy.get('@command').type('{selectall}{backspace}',{force:true})
    cy.get('@command').type('show running-config')

    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    //this explicit wait is needed to wait for completing of procesing on chain ConductorServer<->ElasticSearch<->Dyn
    cy.wait(1000)
    //hopufully now we are ready to go - let us click the workflow id link
    cy.get('div.modal-footer a:first-child').click() //click the ID of the previously executed workflow to see the progress of the workflow

    cy.url().should('include', '/workflows/exec')
    cy.get('div.modal-header').contains('Details of Add_cli_command_template_to_inventory',{timeout:30000})

    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    cy.wait(500) //wait - this element is detached from the DOM. - wait until attached
    //this stopped to work because Tomas added some test of presency and suddenly there are two rect's there
    //I tried to specify the second rect by selector eq(1) but no success because when the command exists then this second  rect is shadowed/nonactive
    //cy.get('g > rect').eq(1).click()
    //cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body').scrollTo('bottom',{duration:500})
    //cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body > div > div > div > div.row').eq(4).scrollIntoView()
    //cy.contains('Summary').click()
    //TODO scroll to bottom
    //cy.get('div.modal-body').last().scrollTo('bottom', { duration: 1000 })

    //cy.get('button.close').click()

    cy.get('div.headerInfo').contains('COMPLETED',{timeout:30000})

    cy.contains('Task Details').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Close').click()
  })

  it('Save a command to inventory SECOND TIME', function() {
    cy.server()
    cy.route('POST', '/api/conductor/workflow').as('getWorkflowId')

    cy.visit('/')

    cy.contains('Workflows').click()
    cy.url().should('include', '/workflows/defs')
    cy.contains('Definitions').click() //there are three tabs: Definitions Executed and Scheduled
    cy.get('input[placeholder="Search by keyword."').type('Add_cli_command_template_to_inventory')
    cy.contains('Add_cli_command_template_to_inventory').click()

    cy.get('button[title="Execute"]').click()

    cy.contains('template_id').next().as('template_id')
    cy.get('@template_id').type('{selectall}{backspace}')
    cy.get('@template_id').type('sh_run')

    //cy.get('div.form-group > textarea').as('command')
    //20200415 ^^^ this stopped to work
    //cy.contains('command template e.g. show running-config').prev().as('command')
    //20200813 ^^^ this stopped to work
    cy.contains(/^command$/).next().as('command')
    cy.get('@command').type('{selectall}{backspace}',{force:true})
    cy.get('@command').type('show running-config')

    cy.get('div.modal-content').contains('Execute').click()
    cy.wait('@getWorkflowId')
    cy.get('div.modal-content').contains('Execute').should('not.to.exist')
    cy.get('div.modal-content').contains('OK')
    //this explicit wait is needed to wait for completing of procesing on chain ConductorServer<->ElasticSearch<->Dyn
    cy.wait(1000)
    //hopufully now we are ready to go - let us click the workflow id link
    cy.get('div.modal-footer a:first-child').click() //click the ID of the previously executed workflow to see the progress of the workflow

    cy.url().should('include', '/workflows/exec')
    cy.get('div.modal-header').contains('Details of Add_cli_command_template_to_inventory',{timeout:30000})

    cy.contains('Execution Flow').click()
    //click on the green box with the CLI_get_cli_journal text.
    cy.get('#detailTabs-tabpane-execFlow').scrollIntoView()
    cy.wait(500) //wait - this element is detached from the DOM. - wait until attached
    //this stopped to work because Tomas added some test of presency and suddenly there are two rect's there
    //I tried to specify the second rect by selector eq(1) but no success because when the command exists then this second  rect is shadowed/nonactive
    //cy.get('g > rect').eq(1).click()
    //cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body').scrollTo('bottom',{duration:500})
    //cy.get('div[role="document"].modal-lg > div.modal-content > div.modal-body > div > div > div > div.row').eq(4).scrollIntoView()
    //cy.contains('Summary').click()
    //TODO scroll to bottom
    //cy.get('div.modal-body').last().scrollTo('bottom', { duration: 1000 })

    //cy.get('button.close').click()

    cy.get('div.headerInfo').contains('COMPLETED')

    cy.contains('Task Details').click()
    cy.contains('Close').scrollIntoView()
    cy.contains('Close').click()
  })
})
