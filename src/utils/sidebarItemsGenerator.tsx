import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/sidebar.type";

export const sidebarItemsGenerator = (items: TUserPath[], role: string) => {
  const sidebarItems = items.reduce((acc: TSidebarItem[], item) => {
    // Check if item.path and item.name are defined
    if (item.path && item.name) {
      acc.push({
        key: item.name, // Ensure item.name is always a string
        label: <NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>,
      });
    }

    if (item.children) {
      acc.push({
        key: item.name ?? "default-key", // Provide a fallback key if item.name is undefined
        label: item.name ?? "Default", // Provide a fallback label if item.name is undefined
        children: item.children
          .map((child) => {
            // Ensure that child.name exists before returning
            if (child.name) {
              return {
                key: child.name,
                label: (
                  <NavLink to={`/${role}/${child.path}`}>{child.name}</NavLink>
                ),
              };
            }
            return null; // Return null if child.name does not exist
          })
          .filter((child) => child !== null) as TSidebarItem[], // Filter out null values and cast to TSidebarItem[]
      });
    }

    return acc;
  }, [] as TSidebarItem[]);

  return sidebarItems;
};
