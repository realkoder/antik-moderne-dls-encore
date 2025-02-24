import { Topic } from "encore.dev/pubsub";

interface UserRequest {
  name: string;
  email: string;
}

export const UserAddedTopic = new Topic<UserRequest>("user-added", {
  deliveryGuarantee: "at-least-once",
});