import { Menu } from "antd";
import { useTranslation } from "react-i18next";

export const GroupMenu = ({ regionStore }) => {
  const { t } = useTranslation();

  return (
    <Menu selectedKeys={[regionStore.view]}>
      <Menu.Item key="regions">
        <div
          onClick={ev => {
            regionStore.setView("regions");
            ev.preventDefault();
            return false;
          }}
          style={{ width: "135px", display: "flex", justifyContent: "space-between" }}
        >
          <div>{t('Regions')}</div>
        </div>
      </Menu.Item>
      <Menu.Item key="labels">
        <div
          onClick={ev => {
            regionStore.setView("labels");
            ev.preventDefault();
            return false;
          }}
          style={{ width: "135px", display: "flex", justifyContent: "space-between" }}
        >
          <div>{t('Labels')}</div>
        </div>
      </Menu.Item>
    </Menu>
  );
};
