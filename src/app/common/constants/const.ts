export class Consts {
    // public static URL = 'localhost';
    // public static URL = '18.220.197.138';//old
    // public static URL = '18.219.49.104';//old
    public static URL = '13.233.107.17';
    public static PORT_NUMBER = '3000';
    public static ROLE_INDEX = [{ 'index': 0, 'name': 'Role' }];
    public static GST_INDEX = [{ 'index': 1, 'name': 'gstdetails' }];
    public static OWNER_INDEX = [{ 'index': 2, 'name': 'ownerdetails' }];
    public static VILLAGE_INDEX = [{ 'index': 3, 'name': 'villagenames' }];
    public static LRLIST_INDEX = [{ 'index': 4, 'name': 'missingLRReason' }];
    public static HIDDEN_TRUCK_INDEX = [{ 'index': 5, 'name': 'ownerdetails' }];
    public static QR_INDEX = [{ 'index': 6, 'name': 'qrCode' }];
    // public static REGULARPARTY_INDEX = [{ 'index': 4, 'name': 'regularparty' }];
    // public static REGULARTRUCK_INDEX = [{ 'index': 5, 'name': 'regulartruck' }];
    // public static THOUGHT_INDEX = [{ 'index': 6, 'name': 'thought' }];
    public static monthNames =
        [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];

    public static MORSE_CODE = {

        'A': '.-',
        'B': '-...',
        'C': '-.-.',
        'D': '-..',
        'E': '.',
        'F': '..-.',
        'G': '--.',
        'H': '....',
        'I': '..',
        'J': '.---',
        'K': '-.-',
        'L': '.-..',
        'M': '--',
        'N': '-.',
        'O': '---',
        'P': '.--.',
        'Q': '--.-',
        'R': '.-.',
        'S': '...',
        'T': '-',
        'U': '..-',
        'V': '...-',
        'W': '.--',
        'X': '-..-',
        'Y': '-.--',
        'Z': '--..',
        ' ': '*'
    };
}
