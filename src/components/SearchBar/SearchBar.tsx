import css from '../SearchBar/SearchBar.module.css';
import { BsSearch } from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
import { useState, FormEvent, ChangeEvent } from 'react';

interface SearchBarProps {
    onSubmit: (e: FormEvent<HTMLFormElement>, inputValue: string) => void;
}

export default function SearchBar({ onSubmit }:SearchBarProps) {
	const [inputValue, setInputValue] = useState<string>('');
	
	function onInputChange(e: ChangeEvent<HTMLInputElement>) {
       setInputValue(e.target.value);
	}
	
	function handleSubmit(e:FormEvent<HTMLFormElement>) {
	e.preventDefault();
		if (inputValue.trim() === '') {
             toast.error("The field cannot be empty!🛑");
             return;
            }
		onSubmit(e,inputValue);
		setInputValue('');
            if (e.target instanceof HTMLFormElement) {
            e.target.reset();
           }
	}

	return (
	     <header className={css.header}>
			<form className={css.form}
				onSubmit={handleSubmit}
			>
				<div className={css.form__inputEl}>
					<input 
                                className={css.form__input}
                                name="search"
                                type="text"
                                placeholder="Search images and photos"
                                onChange={onInputChange}
                                value={inputValue}
					/>
				      <button className={css.form__btn}
					type='submit'
				      >
					<BsSearch className={css.form__btnIcon}
						size={20}
					/>
				      </button>	
				</div>
			</form>
	      </header>
	);
}
