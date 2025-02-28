import {atom} from "jotai";
import type { types } from "~/lib/client";

export const cart = atom<types.PosterDto[]>([]);