import PetProfilePhoto from "./PetProfilePhoto";
import PetInfo from "./PetInfo";
import PetFav from "./PetFav";
import React, { Fragment } from "react";

export default function PetPage() {
  return(
    <Fragment>
      <div class="pet-profile-div" >
        <PetProfilePhoto />
      </div>
      <PetInfo />
      <PetFav />
    </Fragment>
  )
}