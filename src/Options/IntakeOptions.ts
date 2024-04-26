export const intakeOColumns = [
  {
    label:'Date',
    type:'date',
    recordName: 'date',
    width: 64
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
    recordName: 'checked_in',
    width: 52
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
    recordName: 'booked',
    width: 52
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
    recordName: 'reason',
    width: 52
  },
  {
    label:'Arriving Date',
    type:'select_date',
    dependent: 'booked',
    dependentResults: [
      'Booked',
    ],
    recordName: 'expected_arrival_date',
    width: 52
  },
  {
    label:'Client',
    type:'text',
    recordName: 'name',
    width: 52
  },
  {
    label:'DOB',
    type:'date-edit',
    recordName: 'date_of_birth',
    width: 64
  },
  {
    label:'Insurance',
    type:'insurance-edit',
    recordName: 'insurance',
    width: 80
  },
  {
    label:'Prefix',
    type:'text',
    recordName: 'prefix',
    width: 24
  },
  {
    label:'Policy',
    type:'policy-edit',
    recordName: 'policy_id',
    width: 80
  },
  {
    label:'Active',
    type:'boolean',
    recordName: 'active',
    width: 24
  },
  {
    label:'Coordinator',
    type:'people',
    recordName: 'coordinator',
    people: [],
    width: 56
  },
  {
    label:'INN Admit %',
    type:'text',
    recordName: '',
    width: 32
  },
  {
    label:'INN Admit',
    type:'text',
    recordName: '',
    width: 32
  },
  {
    label:'INN Ded',
    type:'dollar',
    recordName: 'inn_deductible',
    width: 32
  },
  {
    label:'INN OOP',
    type:'dollar',
    recordName: 'in_network_oop',
    width: 32
  },
  {
    label:'OON Admit %',
    type:'text',
    recordName: '',
    width: 32
  },
  {
    label:'OON Admit',
    type:'text',
    recordName: '',
    width: 32
  },
  {
    label:'OON Ded',
    type:'dollar',
    recordName: 'onn_deductible',
    width: 32
  },
  {
    label:'OON OOP',
    type:'dollar',
    recordName: 'out_network_oop',
    width: 32
  },
  {
    label:'Source',
    type:'text',
    recordName: 'source',
    width: 32
  },
  {
    label:'Notes',
    type:'popup',
    recordName: '',
    width: 32
  },
  {
    label:'Delete',
    type:'delete',
    recordName: '',
    width: 32
  },
]