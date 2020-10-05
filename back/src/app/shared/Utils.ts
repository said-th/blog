export class Utils {
  public static timeToRead(text: string): any {
    const wordsPerMinute = 200; // Average case.
    let value = 0;

    const textLength = text.split(' ').length; // Split by words
    if (textLength > 0) {
      value = Math.ceil(textLength / wordsPerMinute);
    }
    return value;
  }

  public static slugify(text , suffix): string {
    const from = 'ãàáäâẽèéëêìíïîõòóöôùúüûñç·/_,:;';
    const to = 'aaaaaeeeeeiiiiooooouuuunc------';

    const newText = text.split('').map(
      (letter, i) => letter.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i)));

    return newText
      .toString()                     // Cast to string
      .toLowerCase()                  // Convert the string to lowercase letters
      .trim()                         // Remove whitespace from both sides of a string
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/&/g, '-y-')           // Replace & with 'and'
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-').concat(suffix);        // Replace multiple - with single -
  }

  public static rand(length): string {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }


}
