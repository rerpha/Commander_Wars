#include "scriptvariable.h"

#include "interpreter.h"

ScriptVariable::ScriptVariable(QString id)
    : m_Id(id)
{
    Interpreter::setCppOwnerShip(this);
    buffer.open(QIODevice::ReadWrite);
}

ScriptVariable::ScriptVariable()
{
    Interpreter::setCppOwnerShip(this);
    buffer.open(QIODevice::ReadWrite);
}

void ScriptVariable::serialize(QDataStream& pStream)
{
    pStream << getVersion();
    pStream << m_Id;
    QByteArray data = buffer.data();
    pStream << data.size();
    for (qint32 i = 0; i < data.size(); i++)
    {
        pStream << static_cast<qint8>(data[i]);
    }
}

void ScriptVariable::deserialize(QDataStream& pStream)
{
    qint32 version = 0;
    pStream >> version;
    pStream >> m_Id;
    qint32 size = 0;
    pStream >> size;
    buffer.seek(0);
    for (qint32 i = 0; i < size; i++)
    {
        qint8 value = 0;
        pStream >> value;
        actionData << value;
    }
}