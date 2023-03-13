export default function formatDate(date) {
        const fecha = new Date(date);

        const opcionesFecha = { day: 'numeric', month: 'short', year: 'numeric' };
        const formatoFecha = new Intl.DateTimeFormat('en-US', opcionesFecha);
        const fechaLegible = formatoFecha.format(fecha).toUpperCase();

        return fechaLegible
}