export const intakeOColumns = [
  {
    label:'Date',
    type:'date',
    recordName: 'date'
  },
  {
    label:'Status',
    type:'select',
    options: [
      'Pending',
      'Approved',
      'Approved BD',
      'Approved RTC',
      'Approved LB No RTC',
      'Private Pay',
      'Denied'
    ],
    recordName: 'checked_in'
  },
  {
    label:'Booked',
    type:'select',
    options: [
      'Pending',
      'Arrived',
      'MIA',
      'Booked',
      'Yellow Stripe'
    ],
    dependent: 'checked_in',
    dependentResults: [
      'Approved',
      'Approved BD',
      'Approved RTC',
      'Approved LB No RTC',
    ],
    recordName: 'booked'
  },
  {
    label:'Reason',
    type:'select',
    options: [
      'Pending',
      'Lost Contact',
      'Unwilling To Travel',
      'Booked Out',
      'Other - See Notes'
    ],
    dependent: 'booked',
    dependentResults: [
      'MIA',
      'Yellow Stripe'
    ],
    recordName: 'reason'
  },
  {
    label:'Arriving Date',
    type:'select_date',
    dependent: 'booked',
    dependentResults: [
      'BD',
    ],
    recordName: 'expected_arrival_date'
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
    label:'Insurance',
    type:'text',
    recordName: 'insurance'
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