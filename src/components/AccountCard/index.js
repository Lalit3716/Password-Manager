import React, { useContext, useState } from "react";
import {
  generate,
  checkStrength,
  getColorFromStrength,
} from "../../utils/passwords";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Stack,
  IconButton,
  TextField,
} from "@mui/material";
import {
  Delete,
  Visibility,
  VisibilityOff,
  Edit,
  Save,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import authContext from "../../context/AuthContext";

const AccountCard = ({ account, onDelete, onUpdate }) => {
  const [editData, setEditData] = useState({
    email: account.email,
    password: account.password,
    name: account.name,
  });
  const { mainPass } = useContext(authContext);
  const [visible, setVisible] = useState(false);
  const [editing, setEditing] = useState(false);
  const handleDelete = async () => {
    try {
      await window.db.deleteAccount(account.id);
      onDelete(account.id);
      toast.success("Account deleted successfully");
    } catch (e) {
      toast.error(e.message);
    }
  };

  const hide = password => {
    return password.replace(/./g, "*");
  };

  const onGenerate = () => {
    setEditData({ ...editData, password: generate({ length: 12 }) });
  };

  const validateEditData = () => {
    if (!editData.name) {
      toast.error("Name is required");
      return false;
    }
    if (!editData.email) {
      toast.error("Email is required");
      return false;
    }
    if (!editData.password) {
      toast.error("Password is required");
      return false;
    }
    return true;
  };

  const onSave = async () => {
    setEditing(!editing);
    if (!editing) return;

    if (!validateEditData()) return;

    try {
      const email = window.electronCrypto.encrypt(editData.email, mainPass);
      const password = window.electronCrypto.encrypt(
        editData.password,
        mainPass
      );
      const encryptedData = { ...account, ...editData, email, password };
      await window.db.updateAccount(encryptedData);
      toast.success("Account updated successfully");
      setEditing(false);
      onUpdate({ ...account, ...editData });
    } catch (e) {
      toast.error(e.message);
    }
  };

  return (
    <Card
      elevation={5}
      sx={{
        width: "300px",
        m: 1,
      }}
    >
      <CardContent>
        <Stack>
          {!editing ? (
            <Typography variant="h6">{account.name}</Typography>
          ) : (
            <TextField
              variant="standard"
              value={editData.name}
              onChange={e => setEditData({ ...editData, name: e.target.value })}
            />
          )}
          {!editing ? (
            <Typography variant="body1">{account.email}</Typography>
          ) : (
            <TextField
              variant="standard"
              value={editData.email}
              onChange={e =>
                setEditData({ ...editData, email: e.target.value })
              }
            />
          )}
        </Stack>
        {!editing ? (
          <Stack direction="row" spacing={2} alignItems="center">
            <Typography variant="body1">
              {visible ? account.password : hide(account.password)}
            </Typography>
            <IconButton onClick={() => setVisible(!visible)}>
              {visible ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </Stack>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <Stack>
              <TextField
                type={visible ? "text" : "password"}
                variant="standard"
                value={editData.password}
                onChange={e =>
                  setEditData({ ...editData, password: e.target.value })
                }
                InputProps={{
                  endAdornment: (
                    <IconButton onClick={() => setVisible(prev => !prev)}>
                      {visible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  ),
                }}
              />
              <Typography
                variant="caption"
                color={getColorFromStrength(checkStrength(editData.password))}
              >
                {checkStrength(editData.password)}
              </Typography>
            </Stack>
            <Button onClick={onGenerate}>Generate</Button>
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <Button startIcon={<Delete />} color="error" onClick={handleDelete}>
          Delete
        </Button>
        <Button startIcon={editing ? <Save /> : <Edit />} onClick={onSave}>
          {editing ? "Save" : "Edit"}
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountCard;
