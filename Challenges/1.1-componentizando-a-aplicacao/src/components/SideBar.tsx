import { Button } from "./Button";

import "../styles/sidebar.scss";

import { GenreResponseProps } from "../App";

interface SideBarProps {
  handleChangeGenre(id: number): void;
  selectedGenreId: number;
  genres: Array<GenreResponseProps>;
}

export function SideBar({
  handleChangeGenre,
  selectedGenreId,
  genres,
}: SideBarProps) {
  function handleClickButton(id: number) {
    handleChangeGenre(id);
  }

  return (
    <nav className="sidebar">
      <span>
        Watch<p>Me</p>
      </span>

      <div className="buttons-container">
        {genres.map((genre) => (
          <Button
            key={String(genre.id)}
            title={genre.title}
            iconName={genre.name}
            onClick={() => handleClickButton(genre.id)}
            selected={selectedGenreId === genre.id}
          />
        ))}
      </div>
    </nav>
  );
}
