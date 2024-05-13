export const FollowupOptions = [
  {
    label:'Select',
    type:'checkbox',
    recordName: '',
    width: '24'
  },
  {
    label:'Coordinator',
    type:'people',
    recordName: 'coordinator',
    people: [],
    width: '56'
  },
  {
    label:'Old Claim Id',
    type:'clickable',
    recordName: 'claim_id',
    width: '52'
  },
  {
    label:'New Claim Id',
    type:'text',
    recordName: 'new_claim_id',
    width: '52'
  },
  {
    label:'In Collab',
    type:'text',
    recordName: 'claim_status',
    width: '52'
  },
  {
    label:'Name',
    type:'text',
    recordName: 'name',
    width: '52'
  },
  {
    label:'DOB',
    type:'text',
    recordName: 'dob',
    width: '52'
  },
  {
    label:'Policy',
    type:'text',
    recordName: 'policy_id',
    width: '52'
  },
  {
    label:'Insruance',
    type:'text',
    recordName: 'insurance',
    width: '96'
  },
  {
    label:'Facility',
    type:'text',
    recordName: 'facility',
    width: '52'
  },
  {
    label:'Network',
    type:'text',
    recordName: 'network',
    width: '52'
  },
  {
    label:'Status',
    type:'text',
    recordName: 'status',
    width: '96'
  },
  {
    label:'Notes',
    type:'note',
    recordName: 'fu_note',
    width: '80'
  },
  {
    label:'Charged Total',
    type:'dollar',
    recordName: 'charged_total',
    width: '52'
  },
  {
    label:'Paid Total',
    type:'dollar',
    recordName: 'paid_total',
    width: '52'
  },
  {
    label:'Payout %',
    type:'percent',
    recordName: 'payout_ratio',
    width: '52'
  },
  {
    label:'Balance Total',
    type:'dollar',
    recordName: 'balance_total',
    width: '52'
  },
  {
    label:'Start Date',
    type:'date',
    recordName: 'start_date',
    width: '52'
  },
  {
    label:'End Date',
    type:'date',
    recordName: 'end_date',
    width: '52'
  },
  {
    label:'Delete',
    type:'delete',
    recordName: '',
    width: '52'
  },
]