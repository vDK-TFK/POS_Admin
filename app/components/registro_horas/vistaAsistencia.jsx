'use client'
import React, { useState, useMemo, useCallback } from 'react';
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useSWR from 'swr';
import { useSession } from "next-auth/react";
import 'moment/locale/es'

const MyCalendar = () => {
    const localizer = useMemo(() => momentLocalizer(moment), []);
    const [date, setDate] = useState(new Date()); 
    const [view, setView] = useState(Views.WEEK);
    const { data: session, status } = useSession(); 
    const employeeId = session?.user?.id;

    const onNavigate = useCallback((newDate) => setDate(newDate), []);
    const onView = useCallback((newView) => setView(newView), []);
    const { data, error } = useSWR(employeeId ? `http://localhost:3000/api/calendario/${employeeId}` : null, async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    });

    if (error) return <div>Error al cargar los datos</div>;
    if (!data) return <div>Cargando...</div>;
    if (!Array.isArray(data)) return <div>No hay datos disponibles</div>;

    const demoEvents = data.map((asistencia) => {
        const entrada = moment(asistencia.entrada, "YYYY-MM-DDTHH:mm:ss").toDate();
        const salida = moment(asistencia.salida, "YYYY-MM-DDTHH:mm:ss").toDate();

        return {
            title: asistencia.observacion,
            start: entrada,
            end: salida,
        };
    });

    return (
        <div className="shadow-lg bg-white dark:bg-gray-700 p-4 rounded-lg">
            <div className="col-md-12 px-0">
                <Calendar
                    localizer={localizer}
                    events={demoEvents}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 580 }}
                    messages={{
                        next: "Sig",
                        previous: "Ant",
                        today: "Hoy",
                        month: "Mes",
                        week: "Semana",
                        noEventsInRange: 'No hay eventos en este rango.',
                        day: "Día",
                        date:"Fecha",
                        event: "Nota",
                        time: "Hora"
                      }}
                    date={date}
                    view={view}
                    onNavigate={onNavigate}
                    onView={onView}
                />
            </div>
        </div>
    );
}

export default MyCalendar;
