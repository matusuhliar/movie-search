export const styles = {
    detail: {
        overflow: 'auto !important',
        display: 'block !important'
    },
    top: {
        margin: '5px',
        boxShadow: '0px 0px 5px #2f2f2f',
        background: '#383838',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '3px',
        '> *': {
            color: 'white'
        }
    },
    main: {
        mt: '-4px',
        background: 'white',
        display: 'flex',
        flexDirection: 'row',
        flex: 1,
        overflow: 'hidden'
    },
    linkSelected: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'white',
        alignItems: 'center',
        fontSize: '14px',
        padding: '10px 20px 15px',
        cursor: 'pointer',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        background: '#2f2f2f'
    },
    link: {
        display: 'flex',
        flexDirection: 'column',
        textDecoration: 'none',
        color: 'white',
        alignItems: 'center',
        fontSize: '14px',
        padding: '10px 20px 15px',
        cursor: 'pointer',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        ':hover': {
            background: '#2f2f2f'
        }
    },

    right: {
        background: "white",
        borderRadius: '3px',
        flex: 1,
        margin: '5px',
        padding: '10px',
        boxShadow: '0px 0px 5px #2f2f2f',
        overflow: 'hidden',
        display: 'flex',
        '> div': {
            display: 'flex',
            overflow: 'hidden',
            flexDirection: 'column',
            width: '100%'
        }
    },
    pagination: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '10px',
        height: '60px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    paperList: {
        padding: 2,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center"
    },
    item: {
        cursor: 'pointer',
        height: '260px',
        width: '200px',
        borderRadius: "3px",
        border: "0px solid silver",
        marginBottom: '10px',
        padding: 0,
        boxShadow: '0px 0px 5px #2f2f2f'
    },
    items: {
        flex: '1',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignContent: 'start',
        flexWrap: 'wrap',
        gap: '10px',
        overflow: 'auto'
    },
    itemLabel: {
        textAlign: 'center',
        display: 'table-cell',
        verticalAlign: 'middle',
        fontSize: '10px',
        width: '200px',
        height: '60px'
    },
    itemImage: (url: string) => {
        return {
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'contain',
            backgroundImage: 'url(' + url + ')',
            backgroundColor: '#383838',
            width: '200px',
            height: '200px',
            boxSizing: 'border-box',
            borderRadius: '3px 3px 0px 0px',
            border: '3px solid #383838'
        }
    },
    favorite: (inStorage: boolean) => {
        return {
            border: "1px solid silver",
            display: 'inline-block',
            height: '30px',
            float: 'right',
            color: 'white',
            fontSize: '12px',
            borderRadius: '3px',
            cursor: 'pointer',
            background: inStorage ? "#2f2f2f" : "gray",
            paddingRight: "20px"
        }
    },
    favoriteStar: {
        position: 'relative',
        left: '4px',
        top: '4px',
        marginRight: '10px',
        color: 'yellow'
    }
}