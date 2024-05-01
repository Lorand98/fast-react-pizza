import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData() as Awaited<ReturnType<typeof menuLoader>>;

  return (
    <ul>
      {menu.map((menuItem) => (
        <MenuItem key={menuItem.id} pizza={menuItem} />
      ))}
    </ul>
  );
}

export const menuLoader = async () => {
  const menu = await getMenu();
  return menu;
};

export default Menu;
