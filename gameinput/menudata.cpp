#include "menudata.h"

#include "coreengine/console.h"

#include "resource_management/gamemanager.h"
#include "resource_management/buildingspritemanager.h"
#include "resource_management/unitspritemanager.h"

#include "game/gamemap.h"

#include "game/unit.h"

#include "game/player.h"
#include "game/co.h"

MenuData::MenuData()
    : QObject()
{
    Mainapp* pApp = Mainapp::getInstance();
    this->moveToThread(pApp->getWorkerthread());
    Interpreter::setCppOwnerShip(this);
}

void MenuData::addData(QString text, QString actionID, QString icon, qint32 costs, bool enabled)
{
    texts.append(text);
    actionIDs.append(actionID);
    costList.append(costs);
    enabledList.append(enabled);
    GameManager* pGameManager = GameManager::getInstance();
    iconList.append(pGameManager->getIcon(icon));
}

void MenuData::addUnitData(QString text, QString actionID, Unit* pIcon, qint32 costs, bool enabled)
{
    texts.append(text);
    actionIDs.append(actionID);
    costList.append(costs);
    enabledList.append(enabled);
    GameManager* pGameManager = GameManager::getInstance();
    spUnit menuIcon = dynamic_cast<Unit*>(pGameManager->getIcon(pIcon->getUnitID()).get());
    if (menuIcon.get() != nullptr)
    {
        menuIcon->setHasMoved(pIcon->getHasMoved());
        menuIcon->setHp(pIcon->getHp());
        menuIcon->setAmmo1(pIcon->getAmmo1());
        menuIcon->setAmmo2(pIcon->getAmmo2());
        menuIcon->setFuel(pIcon->getFuel());
        menuIcon->setUnitRank(pIcon->getUnitRank());
        iconList.append(menuIcon);
    }
    else
    {
        iconList.append(new oxygine::Sprite());
    }

}

bool MenuData::validData()
{
    if (texts.size() == actionIDs.size() &&
        actionIDs.size() == costList.size() &&
        costList.size() == enabledList.size())
    {
        return true;
    }
    Console::print("Menu data is inconsistent and considered broken. Game gets stucked now. This may stop the ai from working.", Console::eERROR);
    return false;
}
