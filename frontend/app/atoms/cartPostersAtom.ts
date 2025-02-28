import {atom} from "jotai";
import type { types } from "~/lib/client";

export const cartPostersAtom = atom<types.PosterDto[]>([]);