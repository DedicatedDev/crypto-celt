import { Box, Tab, Tabs } from "@mui/material";
import * as React from "react";
import { useNavigate } from "react-router-dom";

import { Routers } from "../models/router/RouterPath";

// interface MainNavProps{
//     onChangeRouter:(router:Routers)=>void
// }
// export default function MainNavTabs({onChangeRouter}:MainNavProps)
export default function MainNavTabs() {
    const [value, setValue] = React.useState(0);
    const navigate = useNavigate();
    const a11yProps = (index: number) => {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
        };
    };

    const tabs = Object.keys(Routers).filter((item) => {
        return isNaN(Number(item));
    });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        navigate(Object.values(Routers)[newValue]);
    };

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                    {tabs.map((item: string, index) => {
                        return <Tab label={item} {...a11yProps(index)} key={index} />;
                    })}
                </Tabs>
            </Box>
        </Box>
    );
}
