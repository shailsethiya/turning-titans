import React, { useState, useEffect } from "react";
import withRouter from "../../hooks/withRouter";
import Card from "../../components/card";
import { ListingSkeleton } from "../../containers/shared/skeletons";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";
import { ReactComponent as DeleteIcon } from "../../assets/images/delete.svg";
import { ReactComponent as Download } from "../../assets/images/download.svg";
import Tooltip from "@material-ui/core/Tooltip";
import AlertDialog from "../../components/dialog";
import LongMenu from "../../components/long-menu";
import { Box, SvgIcon } from "@material-ui/core";
import variables from "../../containers/shared/variables.module.scss";
import FullScreenDialog from "../../components/full-screen-dialog";
import moment from "moment";
import RfaPreview from "./RfaPreview";
import listingmock from "./listingmock.json";
import "./List.scss";
import { deleteProposals, downloadProposals, getListProposals, perviewProposal } from "../../store/actions";
import { alertDialogue } from "../../utils";
import { useDispatch, useSelector } from "react-redux";

const Listing = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [listing, setListing] = useState([]);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [selectedAction, setSelectedAction] = useState(false);
  const dispatch = useDispatch();

  const deleteDialogContent = {
    title: "Delete",
    content: `Are you sure you want to delete `,
    secContent:
      " ? Note that it is a permanent delete and the model cannot be recovered once deleted.",
    yesBtnTxt: `Yes, deleted`,
    noBtnTxt: `No, keep it`,
  };

  const fetchList = async () => {
    const res = await dispatch(getListProposals());
    setListing(res)
  };

  useEffect(() => {
    fetchList();
  }, []);

  const handleMenuClick = (event, obj) => {
    if (event.currentTarget.textContent === "Delete") {
      setOpenDialog(true);
      setDeleteId(obj?.id)
    }
  };

  const handleDeleteVersion = async () => {
    console.log("deleteId", deleteId)
    if (deleteId) {
      const res = await dispatch(deleteProposals({ id: deleteId }))
      if (res.statusCode == 200) {
        setOpenDialog(false)
        fetchList()
      }
    }

  };

  const handleCloseDialog = () => {
    setAnchorEl(null);
    setOpenDialog(false);
    setDeleteId("");
  };

  const handlePreviewOpen = async (item) => {
    const res = await dispatch(perviewProposal({ id: item?.id }))
    console.log("preview Response", res)
    setSelectedAction({
      dialogTitle: ` ${item?.name} | Preview`,
      component: RfaPreview,
      data: res
    });
  };

  const downloadFile = async (obj) => {
    const res = await dispatch(downloadProposals({ id: obj?.id }))
    window.url(`localhost:5000/api/download_proposal/${obj?.id}`);
  }

  return (
    <Box className="container-height table-view">
      <Card borderRadius="0" title="Listing"></Card>
      <Box>
        <List className="list-header" aria-label="Model at risk">
          <ListItemText
            style={{ paddingLeft: "2vw" }}
            className="col-width1"
            primary={<label className="card-title table-header">No.</label>}
          />
          <ListItemText
            className="col-width2"
            primary={<label className="card-title table-header">Name</label>}
          />
          <ListItemText
            className="col-width"
            primary={
              <label className="card-title table-header">LITM Offering</label>
            }
          />
          <ListItemText
            className="col-width"
            primary={
              <label className="card-title table-header">Created By</label>
            }
          />
          <ListItemText
            className="col-width"
            primary={
              <label className="card-title table-header">Created on</label>
            }
          />
          <ListItemText
            className="col-width"
            primary={
              <label className="card-title table-header text-overflow">
                Genereted Proposal
              </label>
            }
          />
          <ListItemText
            className="col-width"
            primary={<label className="card-title table-header">Status</label>}
          />
          <ListItemText
            className="col-width"
            primary={<label className="card-title table-header">Actions</label>}
          />
        </List>
      </Box>

      {listing?.data?.list?.length > 0 ? (
        <Box className="list-body">
          {listing?.data?.list?.map((item, i) => {
            return (
              <List
                key={i}
                className="list-item-risk"
                aria-label="Model At Risk list"
              >
                <ListItemText
                  style={{ paddingLeft: "2vw" }}
                  className="col-width1"
                  primary={<label className="list-col run">{i + 1}</label>}
                />
                <ListItemText
                  className="col-width2"
                  primary={
                    <label
                      onClick={() => {
                        handlePreviewOpen(item);
                      }}
                      style={{ color: variables.grape }}
                      className="list-col run"
                    >
                      {item?.name}
                    </label>
                  }
                />
                <ListItemText
                  className="col-width"
                  primary={
                    <label className="list-col run">{item?.LTIM_offering}</label>
                  }
                />
                <ListItemText
                  className="col-width"
                  primary={
                    <label className="list-col run">{item?.created_by}</label>
                  }
                />
                <ListItemText
                  className="col-width"
                  primary={
                    <label className="list-col run">
                      {moment(item?.created_on).format("DD/MM/YYYY")}
                    </label>
                  }
                />
                <ListItemText className="col-width">
                  {item?.generated_proposal && (
                    <Tooltip title="Download">
                      <SvgIcon
                        component={Download}
                        style={{
                          fill: "#fff",
                          cursor: "pointer",
                          padding: "0.417vw",
                        }}
                        viewBox="0 0 16 16"
                        htmlColor="#424242"
                        onClick={() => { downloadFile(item) }}
                      />
                    </Tooltip>
                  )}
                </ListItemText>
                <ListItemText
                  className="col-width"
                  primary={<label className="list-col run">{item?.status}</label>}
                />
                <ListItemText className="col-width">
                  <LongMenu
                    longMenu={true}
                    className="long-menu"
                    options={[{ label: "Delete", type: "alert" }]}
                    anchorEl={anchorEl}
                    handleClick={(e) => setAnchorEl(e.currentTarget)}
                    handleMenuClick={(e) => handleMenuClick(e, item)}
                    handleClose={() => setAnchorEl(null)}
                  />
                </ListItemText>
              </List>
            )
          })}
        </Box>
      ) : (
        <Card>
          <ListingSkeleton />
        </Card>
      )}
      <AlertDialog
        open={openDialog}
        handleClose={handleCloseDialog}
        dialogTitle={deleteDialogContent.title}
        dialogContent={deleteDialogContent.content}
        boldContent={deleteDialogContent.boldContent}
        dialogSecContent={deleteDialogContent.secContent}
        noBtn={deleteDialogContent.noBtnTxt}
        yesBtn={deleteDialogContent.yesBtnTxt}
        handleConfirm={() => handleDeleteVersion()}
        background={variables.palePink}
        btnbgColor={variables.bostonUniversityRed}
      />
      {!_.isEmpty(selectedAction) && (
        <FullScreenDialog
          selectedAction={selectedAction}
          bottom="auto"
          top="0"
          left="0"
          right="0"
          resetAction={() => {
            setSelectedAction({});
          }}
        />
      )}
    </Box>
  );
};

export default Listing;
