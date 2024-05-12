import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem, { Pizza } from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as Awaited<ReturnType<typeof loader>>;

  return (
    <ul>
      {menu.map((menuItem: Pizza) => (
        <MenuItem key={menuItem.id} pizza={menuItem} />
      ))}
    </ul>
  );
}

export const loader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
