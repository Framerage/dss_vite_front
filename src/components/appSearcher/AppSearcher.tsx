import React, {useState} from "react";
import SearchIcon from "assets/icons/SearchIcon.png";
import {useForm} from "react-hook-form";
import classes from "./appSearcher.module.css";

interface AppSearcherProps {
  onCreateSearchValue: (value: string) => void;
}
const AppSearcher: React.FC<AppSearcherProps> = React.memo(
  ({onCreateSearchValue}) => {
    const {handleSubmit, register} = useForm<{searchValue: string}>({
      mode: "onSubmit",
      reValidateMode: "onSubmit",
      shouldFocusError: false,
    });
    const [isSearcherActive, setIsSearcherActive] = useState(false);
    const onSearchCard = (data: {searchValue: string}) =>
      onCreateSearchValue(data.searchValue);
    const onActiveSearcher = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setIsSearcherActive(true);
    };
    return (
      <form
        className={classes.searcherContainer}
        onSubmit={handleSubmit(onSearchCard)}
      >
        {isSearcherActive ? (
          <>
            <input
              {...register("searchValue")}
              type="text"
              placeholder="Поиск"
              name="searchValue"
              className={classes.searcherInput}
            />
            <img
              src={SearchIcon}
              alt="SchIcon"
              className={classes.searcherIcon}
              onClick={() => setIsSearcherActive(false)}
            />
          </>
        ) : (
          <button
            type="button"
            onClick={onActiveSearcher}
            className={classes.searcherBtn}
          >
            Поиск
          </button>
        )}
      </form>
    );
  },
);
export default AppSearcher;
