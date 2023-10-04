import React, { useState, useEffect } from 'react';
import withRouter from '../../hooks/withRouter';
import Card from '../../components/card';
import { ListingSkeleton } from '../../containers/shared/skeletons';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import { ReactComponent as DeleteIcon } from '../../assets/images/delete.svg';
import { ReactComponent as Download } from '../../assets/images/download.svg';
import Tooltip from '@material-ui/core/Tooltip';
import AlertDialog from '../../components/dialog';
import LongMenu from '../../components/long-menu';
import { Box, SvgIcon } from '@material-ui/core';
import variables from '../../containers/shared/variables.module.scss';
import moment from 'moment';
import listingmock from './listingmock.json';
import './List.scss';

const Listing = ({ history }) => {
    const [openDialog, setOpenDialog] = useState(false);
    const [listing, setListing] = useState([]);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const deleteDialogContent = {
        title: 'Delete',
        content: `Are you sure you want to delete `,
        secContent:
          ' ? Note that it is a permanent delete and the model cannot be recovered once deleted.',
        yesBtnTxt: `Yes, deleted`,
        noBtnTxt: `No, keep it`,
      };

    const fetchList = () => {
        const { data } = listingmock;
        setListing(data);
    }

    useEffect(() => {
        fetchList();
    }, []);

    const handleMenuClick = (event) => {
        event.currentTarget.textContent === 'Delete' && setOpenDialog(true);
    };

    const handleDeleteVersion = () => {
        const option = {
          method: 'DELETE',
          headers: { 'X-Project-Id': usecaseId },
        };
    
        // request(
        //   endPoints.registry.fetchModel
        //     .concat(modelId)
        //     .concat('/version/')
        //     .concat(selectedVersion.version_id),
        //   option
        // )
        //   .then((response) => {
        //     setTimeout(() => {
        //       history.push({
        //         pathname: DEPLOY_MODEL_ROUTE,
        //       });
        //     }, 2000);
        //   })
        //   .catch((error) => {});
      };

    const handleCloseDialog = () => {
        setAnchorEl(null);
        setOpenDialog(false);
    };

    return (
        <Box className="table-view">
            <Card borderRadius="0" title="Listing"></Card>
            <Box>
                <List className="list-header" aria-label="Model at risk">
                    <ListItemText
                        style={{ paddingLeft: '2vw' }}
                        className="col-width1"
                        primary={<label className="card-title table-header">No.</label>}
                    />
                    <ListItemText
                        className="col-width2"
                        primary={<label className="card-title table-header">Name</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">LITM Offering</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">Rfp</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">Status</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header text-overflow">Genereted Proposal</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">Created By</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">Created on</label>}
                    />
                    <ListItemText
                        className="col-width"
                        primary={<label className="card-title table-header">Actions</label>}
                    />
                </List>
            </Box>

            {listing?.length > 0 ? (
                <Box className="list-body">
                    {listing?.map((item, i) => (
                        <List
                            key={i}
                            className="list-item-risk"
                            aria-label="Model At Risk list"
                        >
                            <ListItemText
                                style={{ paddingLeft: '2vw' }}
                                className="col-width1"
                                primary={<label className="list-col run">{i + 1}</label>}
                            />
                            <ListItemText
                                className="col-width2"
                                primary={<label className="list-col run">{item?.name}</label>}
                            />
                            <ListItemText
                                className="col-width"
                                primary={
                                    <label className="list-col run">
                                        {item?.LITM_offering}
                                    </label>
                                }
                            />
                            <ListItemText
                                className="col-width"
                                primary={
                                    <label className="list-col run">
                                        {item?.LITM_offering}
                                    </label>
                                }
                            />
                            <ListItemText
                                className="col-width"
                                primary={
                                    <label className="list-col run">
                                        {item?.status}
                                    </label>
                                }
                            />
                            <ListItemText className="col-width">
                                {item?.genereted_proposal && (
                                    <Tooltip title="Download">
                                        <SvgIcon
                                            component={Download}
                                            style={{ fill: '#fff', cursor: 'pointer', padding: '0.417vw' }}
                                            viewBox="0 0 16 16"
                                            htmlColor="#424242"
                                        // onClick={downloadFile}
                                        />
                                    </Tooltip>
                                )}
                            </ListItemText>
                            <ListItemText
                                className="col-width"
                                primary={
                                    <label className="list-col run">
                                        {item?.created_by}
                                    </label>
                                }
                            />
                            <ListItemText
                                className="col-width"
                                primary={
                                    <label className="list-col run">
                                        {moment(item?.created_on).format('DD/MM/YYYY')}
                                    </label>
                                }
                            />
                            <ListItemText
                                className="col-width"
                            >
                                <LongMenu
                                    longMenu={true}
                                    className="long-menu"
                                    options={[{ label: 'Delete', type: 'alert' }]}
                                    anchorEl={anchorEl}
                                    handleClick={(e) => setAnchorEl(e.currentTarget)}
                                    handleMenuClick={handleMenuClick}
                                    handleClose={() => setAnchorEl(null)}
                                />
                            </ListItemText>
                        </List>
                    ))}
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
                handleConfirm={handleDeleteVersion}
                background={variables.palePink}
                btnbgColor={variables.bostonUniversityRed}
            />
        </Box >
    )
}

export default Listing;