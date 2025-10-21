import { motion } from "framer-motion";

export function SidebarItem({ itemText, icon, isOpen, active, onClick }) {
  return (
    <a
      onClick={onClick}
      className={`menu-item ${active ? "active" : ""}`}
    >
      {icon}
      {isOpen && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {itemText}
        </motion.span>
      )}
    </a>
  );
}
