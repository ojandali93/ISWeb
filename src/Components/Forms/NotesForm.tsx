import { useState, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import ButtonComponent from "../Inputs/ButtonComponent";
import FormInputComponent from "../Inputs/FormInputComponent";


const NotesForm = () => {
  const {currentNotes, sendNewNotes, currentIntakeId, getNotes} = useData();

  const {currentUser} = useAuth();

  const [noteContent, setNoteContent] = useState("");
  const [submitCount, setSubmitCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true);

  const handleSubmitNotes = () => {
    const data = {
      intake_id: currentIntakeId,
      date: getCurrentDateString(),
      notes: noteContent,
      coordinator: currentUser.userId
    }
    sendNewNotes(data)

    setNoteContent("");

  }

  function getCurrentDateString(): string {
    const date = new Date();
  
    
    const year: number = date.getFullYear();
    let month: string = (date.getMonth() + 1).toString();
    let day: string = date.getDate().toString();
  

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;
  

    return `${year}-${month}-${day}`;
  }

  function reformatDateString(date: string): string {
    if (date === null) return "N/A";
    const dateString = new Date(date);
  
    
    const year: number = dateString.getFullYear();
    let month: string = (dateString.getMonth() + 1).toString();
    let day: string = dateString.getDate().toString();
  

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;
  
    
    return `${year}-${month}-${day}`;
  }



  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-primary w-full">
        <thead className="bg-black min-w-full">
          <tr>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-white uppercase tracking-wider ">
              Notes
            </th>
            <th scope="col" className="px-6 py-3 text-center text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-primary">
          {currentNotes && currentNotes.map((note, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {reformatDateString(note.date) || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-white ">
                {note.notes || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-white">
                {note.name}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <form>
        <div className='flex my-2 px-3 py-2 flex-col justify-center rounded-lg'>
        <p className="b-1 font-bold text-sky-400 text-md mr-4 mb-1">Enter New Note</p>
        <input 
          className="flex-1 text-lg border-b-2 border-b-slate-300 bg-stone-700 text-white"
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
        </div>
        <div className="mb-5">
        <ButtonComponent label="Submit Notes" handler={handleSubmitNotes}/>
        </div>
      </form>
    </div>
  )
}

export default NotesForm