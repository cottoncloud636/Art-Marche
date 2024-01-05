import React from "react";
import { useState } from "react";
import medium from '../../src/medium.json';
import { HiOutlineChevronDown, HiOutlineChevronUp} from "react-icons/hi";

function Dropdown({items, handleSelection, onChange}){
    const [isOpen, setIsOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState('');

    const handleDropDown = (event)=>{
        event.preventDefault();
        setIsOpen(!isOpen);
    };

    const handleItemClick=(value)=>{
        setSelectedItem(value);
        handleSelection(value);
        onChange(value);
        console.log('Selected:', value);
        setIsOpen(false);
    }

    return(
        <div>
            <button onClick={handleDropDown} className='bg-blue-400 flex w-56 h-8 tracking-wider border-4 border-transparent active:border-white duration-500 active:text-purple-300 items-center rounded-lg justify-around'>
                {selectedItem || 'Select the Medium'}{' '}
                <span className=''>{isOpen? (<HiOutlineChevronDown />) : (<HiOutlineChevronUp />)}</span>
            </button>
            { isOpen && items.length > 0 && (
                <ul className='absolute bg-blue-600 flex flex-col items-start rounded-lg p-2 w-56'>
                    {items.map((item)=>(
                        <li key={item.key} onClick={()=>handleItemClick(item.value)}
                            className="hover:bg-blue-300 cursor-pointer rounded-md border-transparent hover:border-white border-2">
                        {item.value}
                        </li> 
                    ))}
                </ul>
                )}
                {isOpen && items.length === 0 && <p>Loading...</p>}
        </div>
    );
}
export default Dropdown;