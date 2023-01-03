export const styles = {
    top: {
        margin: '5px',
        boxShadow: '0px 0px 5px #2f2f2f',
        background: '#383838',
        display: 'flex',
        flexDirection: 'row',
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
        overflow:'hidden'
    },
    linkSelected: {
        display: 'block',
        textDecoration: 'none',
        color: 'white',
        textAlign: 'left',
        borderBottom: '1px solid gray',
        fontSize: '14px',
        padding: '10px 20px 15px',
        cursor: 'pointer',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        background: '#2f2f2f'
    },
    link: {
        display: 'block',
        textDecoration: 'none',
        color: 'white',
        textAlign: 'left',
        borderBottom: '1px solid gray',
        fontSize: '14px',
        padding: '10px 20px 15px',
        cursor: 'pointer',
        fontFamily: '"Roboto","Helvetica","Arial",sans-serif',
        '> svg': {
            position: 'relative',
            top: '5px'
        },
        ':hover': {
            background: '#2f2f2f'
        }
    },
    left: {
        margin: '5px',
        borderRadius: '3px',
        boxShadow: '0px 0px 5px #2f2f2f',
        width: 220,
        background: '#9a9a9a',
    },
    right: {
        background: "white",
        borderRadius: '3px',
        flex: 1,
        margin: '5px',
        marginLeft: '2px',
        padding: '10px',
        boxShadow: '0px 0px 5px #2f2f2f',
        overflow:'hidden',
        display:'flex',
        '> div':{
            display: 'flex',
            overflow:'hidden',
            flexDirection:'column',
            width:'100%'
        }
    },
    pagination:{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '10px',
        height:'60px',
        alignItems:'center',
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
        cursor:'pointer',
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
    }
}