import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { CampaignContext } from "../../contexts/CampaignContext";

export default function CampaignViewButton(props) {
  const { campaigns } = useContext(CampaignContext);
  const history = useHistory();
  const handleClick = () => {
    history.push(`/campaign/${props.currentCampaignId}`, {
      currentCampaign: props.currentCampaignState,
    });
  };
  return (
    <div>
      <Button onClick={handleClick}>View</Button>
    </div>
  );
}
