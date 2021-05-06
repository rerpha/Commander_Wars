#include "3rd_party/oxygine-framework/oxygine/MaterialCache.h"
#include "3rd_party/oxygine-framework/oxygine/Material.h"
#include "3rd_party/oxygine-framework/oxygine/core/oxygine.h"

#include "QMutexLocker"

namespace oxygine
{
    MaterialCache MaterialCache::mcache;

    spMaterial MaterialCache::clone_(const Material& other)
    {
        QMutexLocker alock(&_lock);

        size_t hash;
        Material::compare cm;
        other.update(hash, cm);
        auto items = m_materials.values(hash);
        if (items.size() > 0)
        {
            Material* sec = items[0].get();
            if (cm == sec->_compare && cm(sec, &other))
            {
                return sec;
            }
            //hash collision?
            auto it = items.begin();
            it++; //skip first, already checked

            for (; it != items.end(); it++)
            {
                Material* sec = it->get();
                if (cm == sec->_compare && cm(sec, &other))
                {
                    return sec;
                }
            }
        }
        _addCounter++;
        if (_addCounter > 30)
        {
            removeUnusedNoLock();
        }

        spMaterial copy = other.clone();
        copy->_hash = hash;
        copy->_compare = cm;
        m_materials.insert(hash, copy);

        return copy;
    }

    void MaterialCache::removeUnusedNoLock()
    {
        _addCounter = 0;
        materials fresh;
        for (auto it = m_materials.begin(); it != m_materials.end(); it++)
        {
            if (it.value()->getRefCounter() > 1)
            {
                fresh.insert(it.value()->_hash, it.value());
            }
        }

        std::swap(fresh, m_materials);
    }

    void MaterialCache::removeUnused()
    {
        QMutexLocker alock(&_lock);
        removeUnusedNoLock();
    }

    MaterialCache::MaterialCache()
        : _addCounter(0)
    {

    }

    void MaterialCache::clear()
    {
        QMutexLocker alock(&_lock);
        _addCounter = 0;
        m_materials.clear();
    }

    MaterialCache& MaterialCache::mc()
    {
        return mcache;
    }
}
