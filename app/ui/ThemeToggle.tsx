"use client";

import React from 'react';
import {
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Tooltip,
} from '@mui/material';
import {
    LightMode,
    DarkMode,
    SettingsBrightness,
} from '@mui/icons-material';
import {useTheme} from '../../lib/context/ThemeContext';

const ThemeToggle: React.FC = () => {
    const {mode, setMode, resolvedTheme} = useTheme();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleModeSelect = (selectedMode: 'light' | 'dark' | 'system') => {
        setMode(selectedMode);
        handleClose();
    };

    const getCurrentIcon = () => {
        if (mode === 'system') {
            return <SettingsBrightness/>;
        }
        return resolvedTheme === 'light' ? <LightMode/> : <DarkMode/>;
    };

    const getTooltipText = () => {
        switch (mode) {
            case 'light':
                return 'Light theme';
            case 'dark':
                return 'Dark theme';
            case 'system':
                return `System theme (${resolvedTheme})`;
            default:
                return 'Theme';
        }
    };

    return (
        <>
            <Tooltip title={getTooltipText()}>
                <IconButton
                    onClick={handleClick}
                    size="medium"
                    aria-label="theme toggle"
                    aria-controls={open ? 'theme-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                >
                    {getCurrentIcon()}
                </IconButton>
            </Tooltip>

            <Menu
                id="theme-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        'aria-labelledby': 'theme-button',
                    }
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <MenuItem
                    onClick={() => handleModeSelect('light')}
                    selected={mode === 'light'}
                >
                    <ListItemIcon>
                        <LightMode fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Light</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={() => handleModeSelect('dark')}
                    selected={mode === 'dark'}
                >
                    <ListItemIcon>
                        <DarkMode fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>Dark</ListItemText>
                </MenuItem>

                <MenuItem
                    onClick={() => handleModeSelect('system')}
                    selected={mode === 'system'}
                >
                    <ListItemIcon>
                        <SettingsBrightness fontSize="small"/>
                    </ListItemIcon>
                    <ListItemText>System</ListItemText>
                </MenuItem>
            </Menu>
        </>
    );
};

export default ThemeToggle;
