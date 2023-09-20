import express from "express";
import { deleteUser, getAllUSers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner } from "../middleware";
export default (router: express.Router) => {
    router.get("/users", getAllUSers);
    router.delete("/users/:id", isOwner, deleteUser);
    router.patch("/users/:id", updateUser);
};
