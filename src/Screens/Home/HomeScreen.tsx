import React, { useState } from 'react'
import { useAuth } from '../../Context/AuthContext'
import LayoutComponent from '../BaseScreen'
import PaginationComponent from '../../Components/Pagination/PaginationComponent';
import SelectComponent from '../../Components/Inputs/SelectComponent';
import ButtonComponent from '../../Components/Inputs/ButtonComponent';
import SearchComponent from '../../Components/Inputs/SearchComponent';
import CalendarSelectComponent from '../../Components/Inputs/CalendarSelectComponent';
import MenuTabsComponent from '../../Components/Navigation/MenuTabsComponent';
import SidebarSubMenuComponent from '../../Components/Navigation/SidebarSubMenuComponent';
import SelectInTableComponent from '../../Components/Inputs/SelectInTableComponent';

const options = [
  {
    value: 'Omar',
    label: 'Omar'
  },
  {
    value: 'RJ',
    label: 'RJ'
  },
  {
    value: 'Nasim',
    label: 'Nasim'
  },
]

const navigation = [
  {
    label: 'All'
  },
  {
    label: 'Pending'
  },
  {
    label: 'Successful'
  },
  {
    label: 'Failed'
  },
]

const sideNavigation = [
  {
    tab: 'Collab MD.',
    icon: 'folder',
    route: '/'
  },
  {
    tab: 'Avea',
    icon: 'folder',
    route: '/'
  },
]

const HomeScreen = () => {

  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] =useState(30)

  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [activeSearch, setActiveSearch] = useState<boolean>(false)
  
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const [selectedName, setSelectedNav] = useState<string>('All')

  const [selectedSubTab, setSelectedSubTab] = useState<string>('Collab MD.')

  const handlePageChange = (page: number) => {
    console.log(page)
    setCurrentPage(page);
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  const handleOpenSelect = () => {
    setIsOpen(!isOpen)
  }

  const handleConfirmClick = () => {
    
  }

  const handleSearchUpdate = (text: string) => {
    console.log(text)
    setSearchTerm(text)
  }

  const handleActiveSearch = () => {
    setActiveSearch(!activeSearch)
  }


  const handleDateChange = (date: Date) => {
    setSelectedDate(date);
  };

  const handleTabChange = (text: string) => {
    setSelectedNav(text)
  }

  const handleMenuChange = (text: string) => {
    console.log(text)
    setSelectedSubTab(text)
  }

  return (
    <LayoutComponent sticky={null} children={null} />
  )
}

export default HomeScreen