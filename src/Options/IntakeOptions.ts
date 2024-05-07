export const intakeOColumns = [
  {
    label:'Notes',
    type:'popup',
    recordName: '',
    width: '52'
  },
  {
    label:'Date',
    type:'date',
    recordName: 'date',
    width: '52'
  },
  {
    label:'Client',
    type:'text',
    recordName: 'name',
    width: '52'
  },
  {
    label:'Insurance',
    type:'insurance-edit',
    recordName: 'insurance',
    width: '64'
  },
  {
    label:'Coordinator',
    type:'people',
    recordName: 'coordinator',
    people: [],
    width: '96'
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
    width: '56'
  },
  {
    label:'Booked',
    type:'select',
    options: [
      'Pending',
      'Arrived',
      'MIA',
      'Booked',
      'Booked BD',
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
    width: '52'
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
    width: '52'
  },
  {
    label:'Arriving Date',
    type:'select_date',
    dependent: 'booked',
    dependentResults: [
      'Booked',
    ],
    recordName: 'expected_arrival_date',
    width: '52'
  },
  {
    label:'Facility',
    type:'select',
    options: [
      'Not Set',
      'Affinity',
      'Beachside',
      'Axis',
    ],
    recordName: 'facility',
    width: '52'
  },
  {
    label:'DOB',
    type:'date-edit',
    recordName: 'date_of_birth',
    width: '52'
  },
  {
    label:'Prefix',
    type:'text',
    recordName: 'prefix',
    width: '52'
  },
  {
    label:'Policy',
    type:'policy-edit',
    recordName: 'policy_id',
    width: '92'
  },
  {
    label:'Active',
    type:'boolean',
    recordName: 'active',
    width: '52'
  },
  // {
  //   label:'INN Admit %',
  //   type:'text',
  //   recordName: '',
  //   width: '52'
  // },
  // {
  //   label:'INN Admit',
  //   type:'text',
  //   recordName: '',
  //   width: '32'
  // },
  {
    label:'INN Ded',
    type:'dollar',
    recordName: 'inn_deductible',
    width: '52'
  },
  {
    label:'INN OOP',
    type:'dollar',
    recordName: 'in_network_oop',
    width: '52'
  },
  // {
  //   label:'OON Admit %',
  //   type:'text',
  //   recordName: '',
  //   width: '52'
  // },
  // {
  //   label:'OON Admit',
  //   type:'text',
  //   recordName: '',
  //   width: '32'
  // },
  {
    label:'OON Ded',
    type:'dollar',
    recordName: 'onn_deductible',
    width: '52'
  },
  {
    label:'OON OOP',
    type:'dollar',
    recordName: 'out_network_oop',
    width: '52'
  },
  {
    label:'Source',
    type:'text',
    recordName: 'source',
    width: '52'
  },
  {
    label:'Delete',
    type:'delete',
    recordName: '',
    width: '52'
  },
]