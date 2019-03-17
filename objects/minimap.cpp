#include "minimap.h"

#include "game/gamemap.h"

#include "game/player.h"

#include "game/unit.h"

#include "game/building.h"

#include "game/co.h"

#include "coreengine/tweentogglevisibility.h"

#include "resource_management/gamemanager.h"

Minimap::Minimap()
    : QObject()
{

}

Minimap::~Minimap()
{
}

void Minimap::updateMinimap(GameMap* pMap)
{
    // clear minimap
    removeChildren();
    // load new minimap
    qint32 width = static_cast<qint32>(pMap->getMapWidth());
    qint32 heigth = static_cast<qint32>(pMap->getMapHeight());
    setSize(ImageSize * width, ImageSize * heigth);
    GameManager* pGameManager = GameManager::getInstance();
    for (qint32 x = 0; x < width; x++)
    {
        for (qint32 y = 0; y < heigth; y++)
        {
            Terrain* pTerrain = pMap->getTerrain(x, y);
            Building* pBuilding = pTerrain->getBuilding();
            if (pBuilding != nullptr)
            {
                oxygine::ResAnim* pAnim = pGameManager->getResAnim(pBuilding->getMinimapIcon().toStdString().c_str());
                oxygine::spSprite pSprite = new oxygine::Sprite();
                if (pAnim->getTotalFrames() > 1)
                {
                    oxygine::spTween tween = oxygine::createTween(oxygine::TweenAnim(pAnim), pAnim->getTotalFrames() * GameMap::frameTime, -1);
                    pSprite->addTween(tween);
                }
                else
                {
                    pSprite->setResAnim(pAnim);
                }
                pSprite->setPosition(x * ImageSize, y * ImageSize);
                Player* pPlayer = pBuilding->getOwner();
                if (pPlayer != nullptr)
                {
                    QColor color = pPlayer->getColor();
                    pSprite->setColor(color.red(), color.green(), color.blue(), 255);
                }
                addChild(pSprite);
            }
            else
            {
                oxygine::ResAnim* pAnim = pGameManager->getResAnim(pTerrain->getMinimapIcon().toStdString().c_str());
                oxygine::spSprite pSprite = new oxygine::Sprite();
                if (pAnim->getTotalFrames() > 1)
                {
                    oxygine::spTween tween = oxygine::createTween(oxygine::TweenAnim(pAnim), pAnim->getTotalFrames() * GameMap::frameTime, -1);
                    pSprite->addTween(tween);
                }
                else
                {
                    pSprite->setResAnim(pAnim);
                }
                pSprite->setPosition(x * ImageSize, y * ImageSize);
                addChild(pSprite);
            }
            Unit* pUnit = pTerrain->getUnit();
            if (pUnit != nullptr)
            {
                oxygine::ResAnim* pAnim = pGameManager->getResAnim("minimap_unit");
                oxygine::spSprite pSprite = new oxygine::Sprite();
                if (pAnim->getTotalFrames() > 1)
                {
                    oxygine::spTween tween = oxygine::createTween(oxygine::TweenAnim(pAnim), pAnim->getTotalFrames() * GameMap::frameTime, -1);
                    pSprite->addTween(tween);
                }
                else
                {
                    pSprite->setResAnim(pAnim);
                }
                oxygine::spTween tween2 = oxygine::createTween(TweenToggleVisibility(0, 0.5f), 1000, -1);
                pSprite->addTween(tween2);
                pSprite->setPosition(x * ImageSize, y * ImageSize);
                Player* pPlayer = pUnit->getOwner();
                QColor color = pPlayer->getColor();
                pSprite->setColor(color.red(), color.green(), color.blue(), 255);
                pSprite->setPriority(1);
                addChild(pSprite);
            }
        }
    }
}