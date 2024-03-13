#include <stdio.h>
#include <stdlib.h>
int main(int argc, char *argv[]) {
    int n=5,m=5;
    char input,map[50][50];
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            map[i][j] = '-';
        }
    }
    int stop=0,i=0,moves=0,score=0,pos[2] = {n/2,m/2};
    int bonus[2];
    int trap[2] ;
    int death[2];
    map[pos[0]][pos[1]] = '+';
    do{
    bonus[0] = arc4random_uniform(n); bonus[1] = arc4random_uniform(m);
    trap[0] = arc4random_uniform(n); trap[1] = arc4random_uniform(m);
    death[0] = arc4random_uniform(n); death[1] = arc4random_uniform(m);
    }while((bonus[0] == trap[0] && bonus[1] == trap[1]) || (bonus[0] == death[0] && bonus[1] == death[1]) || (trap[0] == death[0] && trap[1] == death[1]) || (bonus[0] == pos[0] && bonus[1] == pos[1]) || (trap[0] == pos[0] && trap[1] == pos[1]) || (death[0] == pos[0] && death[1] == pos[1]));
    map[bonus[0]][bonus[1]] = 'B';
    map[trap[0]][trap[1]] = 'T';
    map[death[0]][death[1]] = 'D';
    do{
    printf("Map:\n");
    for (int i = 0; i < n; i++) {
        for (int j = 0; j < m; j++) {
            printf("%c ", map[i][j]);
        }
        printf("\n");
    }
    printf("Score: %d\n", score);
    printf("Moves: %d\n", moves);
    printf("Enter a direction (w,a,s,d) or c to quit: ");
    scanf(" %c", &input);
// pos[0] updown pos[1] lr
     if (input == 'w') {
        printf("Moving up\n");
        map[pos[0]][pos[1]] = '-';
        if (pos[0] == 0) {
            pos[0] = n-1;
        }
        else {
            pos[0]--;
        }
    } else if (input == 'a') {
        printf("Moving left\n");
        map[pos[0]][pos[1]] = '-';
        if (pos[1] == 0) {
            pos[1] = m-1;
        }
        else {
            pos[1]--;
        }
    } else if (input == 's') {

        printf("Moving down\n");
        map[pos[0]][pos[1]] = '-';
        if (pos[0] == n-1) {
            pos[0] = 0;
        }
        else {
            pos[0]++;
        }
    } else if (input == 'd') {
        printf("Moving right\n");
        map[pos[0]][pos[1]] = '-';
        if (pos[1] == m-1) {
            pos[1] = 0;
        }
        else {
            pos[1]++;
        }
    } else if (input == 'c') {
        printf("Quitting\n");
    } else {
        printf("Invalid input\n");
    }
    map[pos[0]][pos[1]] = '+';
    if (pos[0] == bonus[0] && pos[1] == bonus[1]) {
        score++;
        do{
        bonus[0]= arc4random_uniform(n);
        bonus[1]= arc4random_uniform(m);
        }while((bonus[0] == trap[0] && bonus[1] == trap[1]) || (bonus[0] == death[0] && bonus[1] == death[1]) || (bonus[0] == pos[0] && bonus[1] == pos[1]));
    }
    if (pos[0] == trap[0] && pos[1] == trap[1]) {
        score--;
        do{
        trap[0]= arc4random_uniform(n);
        trap[1]= arc4random_uniform(m);
        }while((trap[0] == bonus[0] && trap[1] == bonus[1]) || (trap[0] == death[0] && trap[1] == death[1]) || (trap[0] == pos[0] && trap[1] == pos[1]));
        }
    if (pos[0] == death[0] && pos[1] == death[1]) {
        score = 0;
        do{
        death[0]= arc4random_uniform(n);
        death[1]= arc4random_uniform(m);
        }while((death[0] == bonus[0] && death[1] == bonus[1]) || (death[0] == trap[0] && death[1] == trap[1]) || (death[0] == pos[0] && death[1] == pos[1]));
    }
    if (score % 3 == 0 && score != 0 && stop == 0) {
        map[death[0]][death[1]] = '-';
        do{
        death[0]= arc4random_uniform(n);
        death[1]= arc4random_uniform(m);
        }while((death[0] == bonus[0] && death[1] == bonus[1]) || (death[0] == trap[0] && death[1] == trap[1]) || (death[0] == pos[0] && death[1] == pos[1]));
        stop = 1;
    }
    else if (score % 3 != 0) {
    stop = 0;
    }
    if (moves % 5 == 0 && moves != 0) {
        do{
        map[trap[0]][trap[1]] = '-';
        trap[0]= arc4random_uniform(n);
        trap[1]= arc4random_uniform(m);
        }while((trap[0] == bonus[0] && trap[1] == bonus[1]) || (trap[0] == death[0] && trap[1] == death[1]) || (trap[0] == pos[0] && trap[1] == pos[1]));

    }
    map[bonus[0]][bonus[1]] = 'B';
    map[trap[0]][trap[1]] = 'T';
    map[death[0]][death[1]] = 'D';
    moves++;
    }while(input != 'c');
    return 0;
}
