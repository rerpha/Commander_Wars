#include "slider.h"

#include "coreengine/mainapp.h"
#include "resource_management/objectmanager.h"
#include "resource_management/fontmanager.h"

Slider::Slider(qint32 width, qint32 minValue, qint32 maxValue, QString unit)
    : V_Scrollbar (width - 90, (width - 90) * 100 / 10),
      m_minValue(minValue),
      m_maxValue(maxValue),
      m_Unit(unit)
{
    Mainapp* pApp = Mainapp::getInstance();
    this->moveToThread(pApp->getWorkerthread());
    V_Scrollbar::setScrollspeed( width / (maxValue - minValue));

    m_spinBox = new SpinBox(150, minValue, maxValue);
    m_spinBox->setUnit(" " + unit);
    addChild(m_spinBox);
    m_spinBox->setX(getWidth() + 15);
    connect(this, &Slider::V_Scrollbar::sigScrollValueChanged, this, &Slider::slotSliderValueChanged, Qt::QueuedConnection);
    connect(m_spinBox.get(), &SpinBox::sigValueChanged, this, &Slider::slotSpinBoxValueChanged, Qt::QueuedConnection);
}

void Slider::slotSliderValueChanged(float value)
{    
    m_spinBox->setCurrentValue((m_maxValue - m_minValue) * value + m_minValue);
    emit sliderValueChanged(static_cast<qint32>(m_spinBox->getCurrentValue()));
}

qint32 Slider::getCurrentValue() const
{
    return static_cast<qint32>(m_spinBox->getCurrentValue());
}

void Slider::slotSpinBoxValueChanged(qreal currentValuevalue)
{
    qint32 value = static_cast<qint32>(currentValuevalue);
    if (value < m_minValue)
    {
        value = m_minValue;
    }
    else if (value > m_maxValue)
    {
        value = m_maxValue;
    }
    else
    {
        // all fine do nothing
    }
    float scrollValue = static_cast<float>(value - m_minValue) / static_cast<float>(m_maxValue - m_minValue);
    V_Scrollbar::setScrollvalue(scrollValue);
    emit sliderValueChanged(static_cast<qint32>(scrollValue));
}

void Slider::setCurrentValue(const qint32 &CurrentValue)
{    
    qint32 value = CurrentValue;
    if (value < m_minValue)
    {
        value = m_minValue;
    }
    else if (value > m_maxValue)
    {
        value = m_maxValue;
    }
    else
    {
        // all fine do nothing
    }
    m_spinBox->setCurrentValue(value);
    float scrollValue = static_cast<float>(value - m_minValue) / static_cast<float>(m_maxValue - m_minValue);
    V_Scrollbar::setScrollvalue(scrollValue);    
}