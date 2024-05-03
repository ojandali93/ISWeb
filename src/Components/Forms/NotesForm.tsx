import { useState, useEffect } from "react";
import { useData } from "../../Context/DataContext";
import { useAuth } from "../../Context/AuthContext";
import ButtonComponent from "../Inputs/ButtonComponent";
import FormInputComponent from "../Inputs/FormInputComponent";


const NotesForm = () => {
  const {currentNotes, sendNewNotes, currentIntakeId} = useData();

  const {currentUser} = useAuth();

  const [noteContent, setNoteContent] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [notesDisplay, setNotesDisplay] = useState("");

  const handleSubmitNotes = () => {
    const data = {
      intake_id: currentIntakeId,
      date: getCurrentDateString(),
      notes: noteContent,
      coordinator: currentUser.userId
    }
    console.log("This is currentIntakeId",currentIntakeId)
    console.log("This is the sent Data ",data);
    sendNewNotes(data);
    console.log("This is userId",currentUser.userId)
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

    useEffect(() => {

    setTimeout(() => {
      setIsLoading(false); 
    }, 1000);
  }, []);


  return (
    <div className="">
      <table className="min-w-full divide-y divide-primary">
        <thead className="bg-black">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Date
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Notes
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
              Name
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-primary">
          {currentNotes && currentNotes.map((note, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                {note.date || "N/A"}
              </td>
              <td className="px-6 py-4 whitespace-wrap text-sm text-white">
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
        <FormInputComponent
        handleFunction={setNoteContent}
        value={noteContent}
        type={'text'}
        icon={'Enter New Note'}
        />
        <div className="mb-5">
        <ButtonComponent label="Submit Notes" handler={handleSubmitNotes}/>
        </div>
      </form>
    </div>
  )
}

export default NotesForm