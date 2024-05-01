export const accountsOptions = [
  {
    label:'Name',
    type:'text',
    recordName: 'name',
  },
  {
    label:'Email',
    type:'text',
    recordName: 'email'
  },
  {
    label:'Privileges',
    type:'select',
    options: [
      'staff',
      'manager',
      'admin',
      'dev',
      'owner',
    ],
    recordName: 'privileges'
  },
  {
    label:'Department',
    type:'select',
    options: [
      'intake',
      'administration',
      'dev',
      'billing'
    ],
    recordName: 'department'
  },
  {
    label:'Company',
    type:'text',
    recordName: 'company'
  },
]