import Keycloak from "keycloak-js";

const keycloak = new Keycloak({
  realm: "baw",
  url: "http://localhost:8080/",
  clientId: "restaurant-kiosk",
});

export default keycloak;
