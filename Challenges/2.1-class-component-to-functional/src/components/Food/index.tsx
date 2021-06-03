import { useState } from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";

import { Container, Header } from "./styles";
import api from "../../services/api";

interface FoodType {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface Props {
  food: FoodType;
  onDelete: (id: number) => void;
  onEdit: (food: FoodType) => void;
}

const Food = ({ food, onDelete, onEdit }: Props) => {
  const [isAvailable, setIsAvailable] = useState(food.available);

  const handleToggle = async () => {
    await api.put(`/foods/${food.id}`, {
      ...food,
      available: !isAvailable,
    });

    setIsAvailable(!isAvailable);
  };

  const handleSetEditingFood = () => {
    onEdit(food);
  };

  return (
    <Container>
      <Header available={isAvailable}>
        <img src={food.image} alt={food.name} />
      </Header>
      <section className="body">
        <h2>{food.name}</h2>
        <p>{food.description}</p>
        <p className="price">
          R$ <b>{food.price}</b>
        </p>
      </section>
      <section className="footer">
        <div className="icon-container">
          <button
            type="button"
            className="icon"
            onClick={handleSetEditingFood}
            data-testid={`edit-food-${food.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type="button"
            className="icon"
            onClick={() => onDelete(food.id)}
            data-testid={`remove-food-${food.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        <div className="availability-container">
          <p>{isAvailable ? "Disponível" : "Indisponível"}</p>

          <label htmlFor={`available-switch-${food.id}`} className="switch">
            <input
              id={`available-switch-${food.id}`}
              type="checkbox"
              checked={isAvailable}
              onChange={handleToggle}
              data-testid={`change-status-food-${food.id}`}
            />
            <span className="slider" />
          </label>
        </div>
      </section>
    </Container>
  );
};

export { Food };
