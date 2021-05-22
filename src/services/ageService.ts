import { baseService } from "./baseService";

export const getCivilizations = () => baseService().get("civilizations");
