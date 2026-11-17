import {
  HelloApi,
} from "../api";
import { Configuration } from "../api/configuration";

const configuration = new Configuration();
export const helloApi = new HelloApi(configuration);