export const intakeOColumns = [
  {
    label:'Date',
    type:'text',
    recordName: 'date'
  },
  {
    label:'Checked In',
    type:'select',
    options: [
      'Pending',
      'Arrived',
      'MIA'
    ],
    recordName: 'checked_in'
  },
  {
    label:'VOB',
    type:'select',
    options: [
      'Pending',
      'Good VOB',
      'Bad VOB',
    ],
    recordName: 'summary_out'
  },
  {
    label:'Booked',
    type:'select',
    options: [
      'Pending',
      'Approved',
      'Denied'
    ],
    recordName: 'booked'
  },
  {
    label:'Client',
    type:'text',
    recordName: 'name'
  },
  {
    label:'DOB',
    type:'date',
    recordName: 'date_of_birth'
  },
  {
    label:'Prefix',
    type:'text',
    recordName: 'prefix'
  },
  {
    label:'Policy',
    type:'text',
    recordName: 'policy_id'
  },
  {
    label:'Insurance',
    type:'text',
    recordName: 'insurance'
  },
  {
    label:'Active',
    type:'boolean',
    recordName: 'active'
  },
  {
    label:'Coordinator',
    type:'people',
    recordName: 'coordinator',
    people: []
  },
  {
    label:'INN Admit %',
    type:'text',
    recordName: ''
  },
  {
    label:'INN Admit',
    type:'text',
    recordName: ''
  },
  {
    label:'INN Ded',
    type:'dollar',
    recordName: 'inn_deductible'
  },
  {
    label:'INN OOP',
    type:'dollar',
    recordName: 'in_network_oop'
  },
  {
    label:'OON Admit %',
    type:'text',
    recordName: ''
  },
  {
    label:'OON Admit',
    type:'text',
    recordName: ''
  },
  {
    label:'OON Ded',
    type:'dollar',
    recordName: 'onn_deductible'
  },

  {
    label:'OON OOP',
    type:'dollar',
    recordName: 'out_network_oop'
  },
  {
    label:'Source',
    type:'text',
    recordName: 'source'
  },
  {
    label:'Notes',
    type:'form',
    recordName: ''
  },
]